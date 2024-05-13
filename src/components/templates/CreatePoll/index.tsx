"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import endpoints from "@/config/endpoints"
import routes from "@/config/routes"
import { useCustomNavigation } from "@/hooks/useCustomNavigation"
import fetchAPI from "@/lib/fetch"
import { PollDocument } from "@/models/polls"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusIcon, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import React, { useMemo } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

export default function CreatePollTemplate() {
  const router = useCustomNavigation()
  const optionObj = z.object({
    value: z.string().min(1)
  })
  const formSchema = useMemo(
    () =>
      z.object({
        poll_subject: z.string().min(1, { message: "The question cannot be empty." }),
        poll_options: z.array(optionObj).min(1, { message: "At least one is required." })
      }),
    []
  )
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poll_subject: "",
      poll_options: []
    }
  })
  const { control, register, formState, watch } = form
  const { fields, append, remove } = useFieldArray({
    control,
    name: "poll_options"
  })

  const handleCreatePoll = async (data: z.infer<typeof formSchema>) => {
    const { data: PollData } = await fetchAPI<PollDocument>({
      url: endpoints.createPoll,
      method: "POST",
      payload: {
        subject: data.poll_subject,
        options: data.poll_options.map((opt) => opt.value)
      }
    })
    if (PollData) {
      router.push(routes.livePoll(PollData.poll_id))
    }
  }
  // console.log(formState.errors);

  return (
    <div className="container py-10">
      <Form {...form}>
        <form className="w-full flex flex-col gap-10" onSubmit={form.handleSubmit(handleCreatePoll)}>
          <center>
            <h4 className="text-4xl font-bold uppercase mb-2">Create A Poll</h4>
            <p className="text-lg opacity-70">Go ahead, create a poll!</p>
          </center>
          <div className="flex flex-col gap-5">
            <p className="uppercase font-bold text-sm">Question</p>
            <FormField
              control={control}
              name="poll_subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input className="w-full py-5 px-5 rounded-full" placeholder="Enter question here" {...field} />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-5">
            <p className="uppercase font-bold text-sm">Options</p>
            <div className="flex flex-col gap-3">
              <center>
                <span className="text-danger text-sm">
                  {formState.errors?.poll_options?.message || formState.errors?.poll_options?.root?.message}
                  {formState.errors?.poll_options?.length &&
                    formState.errors.poll_options.length > 0 &&
                    "The option cannot be empty."}
                </span>
              </center>
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex w-full items-center space-x-2 border-2 border-solid border-border rounded-full px-3 bg-secondaryBackground"
                >
                  <Input
                    className="flex-1 bg-transparent border-0 hide-arrow focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Enter answer here"
                    {...register(`poll_options.${index}.value`)}
                  />
                  <Button type="button" className="rounded-full bg-danger" size="icon" onClick={() => remove(index)}>
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => append({ value: "" })}
              className="py-6 border-dashed border-primary hover:bg-secondaryBackground hover:text-primary duration-300 rounded-full uppercase"
            >
              <PlusIcon className="mr-3" /> Add a option
            </Button>

            <Button
              type="submit"
              className="py-6 border-dashed border-primary hover:bg-secondaryBackground hover:text-primary duration-300 rounded-full uppercase"
            >
              Create Poll
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
