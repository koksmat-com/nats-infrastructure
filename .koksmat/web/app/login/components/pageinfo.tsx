"use client";
import { useEffect, useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePageInfo } from "@/magicservices/sharepoint-governance";
import { MutatingDots } from "react-loader-spinner";
import { getTransactionId } from "../server";
import ShowNatsLog from "./nats";

export default function PageInfo(props: { url: string }) {
  const { url } = props;
  const [infochannelid, setinfochannelid] = useState("");
  const [info, setinfo] = useState("");

  useEffect(() => {
    const load = async () => {
      const id = await getTransactionId();
      setinfochannelid(id);
    };
    load();
  }, []);

  const pageActions = useMemo(() => {
    return [{ Title: "Approve", Email: "" }];
  }, []);

  const { pageinfo, pageinfoerror, isLoading } = usePageInfo(url);

  return (
    <div>
      {isLoading && <div>{isLoading}</div>}

      {pageinfoerror && pageinfoerror === "503" && (
        <div className="text-red-600">
          Cannot connect to backend at the moment, most likely the
          sharepoint-governance service is not running
        </div>
      )}
      {pageinfoerror && pageinfoerror !== "503" && (
        <div className="text-red-600">{pageinfoerror}</div>
      )}

      {/* <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Page History</AccordionTrigger>
          <AccordionContent>
            <div>
              {pageinfo?.versions.map((v, i) => {
                return (
                  <div key={i} className="mt-3 text-sm">
                    <div>{v.isTranslation ? "translation" : ""}</div>
                    <div>{v.lastModifiedBy}</div>
                    <div>{v.lastModified}</div>
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Site Owners</AccordionTrigger>
          <AccordionContent>
            {pageinfo?.siteowners.map((v, i) => {
              return (
                <div key={i} className="mt-3 text-sm">
                  <div>{v.Title}</div>
                  <div>{v.Email}</div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Page Actions</AccordionTrigger>
          <AccordionContent>
            {pageActions.map((v, i) => {
              return (
                <div key={i} className="mt-3 text-sm">
                  <div>{v.Title}</div>
                  <div>{v.Email}</div>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      {infochannelid && (
        <div>
          {/* <div>{infochannelid}</div> */}
          <ShowNatsLog subject={"trace"} />
        </div>
      )}
    </div>
  );
}
