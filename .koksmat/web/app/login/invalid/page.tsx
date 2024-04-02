import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function InvalidPin() {
  return (
    <div className="flex">
      <div className="grow"></div>
      <div className="border w-96 p-6">
        <h4>The pincode you entered is either invalid or have expired</h4>
        <div>
          If you are having problems logging in, please contact Nexi HR.
        </div>
        <div className="mt-10">
          <Link href="/login">
            <Button className="">Try again</Button>
          </Link>
        </div>
      </div>
      <div className="grow"></div>
    </div>
  );
}
