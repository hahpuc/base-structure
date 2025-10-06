import * as React from "react";
import { cn } from "@/components/tiptap/lib/tiptap-utils";
import "@/components/tiptap/components/tiptap-ui-primitive/input/input.less";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input type={type} className={cn("tiptap-input", className)} {...props} />
  );
}

function InputGroup({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("tiptap-input-group", className)} {...props}>
      {children}
    </div>
  );
}

export { Input, InputGroup };
