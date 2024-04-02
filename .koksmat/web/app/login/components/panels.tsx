import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function RootPanel(props: {
  title: string;
  children: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
}) {
  const { title, children, onOpenChange } = props;
  const [open, setopen] = useState(true);

  const openChange = (open: boolean) => {
    setopen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <Sheet open={open} onOpenChange={openChange}>
      <SheetTrigger>Open</SheetTrigger>
      <SheetContent
        className="bg-white"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{children}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
