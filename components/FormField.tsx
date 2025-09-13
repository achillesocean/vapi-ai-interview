import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "file";
}

const FormField = ({
  control,
  name,
  label,
  placeholder,
  type,
}: FormFieldProps<T>) => (
  //that <T> is called a generic T parameter?

  // this component is supposed to enable inputs, or what?
  // <FormField
  //   control={form.control}
  //   //what is this control?
  //   name="username"
  //   render={({ field }) => (
  //     <FormItem>
  //       <FormLabel>Username</FormLabel>
  //       <FormControl>
  //         <Input placeholder="username" {...field} />
  //       </FormControl>
  //       <FormMessage />
  //     </FormItem>
  //   )}
  // />
  // what is this formfield supposed to be in the first place?

  <Controller
    control={control}
    //what is this control?
    name={name} // this used to be "username" and there was a bug that synced inputs to all of the inputs
    render={({ field }) => (
      // where is { field } getting passed in from?
      <FormItem>
        <FormLabel className="label">{label}</FormLabel>
        <FormControl>
          <Input
            className="input"
            type={type}
            placeholder={placeholder}
            {...field}
          />
          {/* why are we typing in type n placeholder props if we're spreading field too? */}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

export default FormField;
