"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function ShowTool(props: { showtool: string; sourceUrl: string }) {
  const { showtool, sourceUrl } = props;
  if (showtool) {
    return (
      <div className="hidden bg-gray-200  p-3">
        <Dialog
          open={showtool ? true : false}
          onOpenChange={() => {
            if (!window.top) return;
            window.top.postMessage(
              {
                type: "hidetool",
                data: "",
              },
              "*"
            );
          }}
        >
          <DialogContent
            className=" bg-white"
            style={{
              minHeight: "calc(100vh - 100px)",
              minWidth: "calc(100vw - 100px)",
            }}
          >
            <DialogHeader>
              <DialogTitle>Tool</DialogTitle>
              <DialogDescription>...</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 ">
              <div className="grid grid-cols-4 items-center gap-4">
                <iframe
                  src={showtool}
                  width="600px"
                  height="400px"
                  style={{
                    minHeight: "calc(100vh - 300px)",
                    minWidth: "calc(100vw - 140px)",
                  }}
                ></iframe>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                disabled={sourceUrl === ""}
                onClick={() => {
                  throw new Error("not implemented");
                }}
              >
                Get help with this app
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
