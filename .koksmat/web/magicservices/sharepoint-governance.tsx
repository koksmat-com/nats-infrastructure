"use client";
import { useEffect, useState } from "react";

import { run } from "./run";

export const SERVICENAME = "sharepoint-governance";

export interface IPageInfoRequest {
  url: string;
}

export interface IPageinfo {
  versions: Version[];
  page: string;
  siteowners: Siteowner[];
}

export interface Version {
  folder?: string;
  lastModifiedBy: string;
  isTranslation?: boolean;
  page: string;
  lastModified: string;
}

export interface Siteowner {
  Title: string;
  UserPrincipalName: string;
  Email: string;
}

export const usePageInfo = (url: string) => {
  const [pageinfo, setpageinfo] = useState<IPageinfo>();
  const [isLoading, setisLoading] = useState(false);
  const [error, seterror] = useState("");
  useEffect(() => {
    const load = async () => {
      setisLoading(true);
      const r = await run<IPageinfo>(
        "sharepoint-governance.pages.info",
        [url],
        "",
        20,
        "test"
      );
      setisLoading(false);
      if (r.hasError) {
        seterror(r.errorMessage ?? "Error loading page info");
      } else {
        setpageinfo(r.data);
      }
    };
    load();
  }, [url]);

  return {
    pageinfo,
    pageinfoerror: error,
    isLoading,
  };
};
