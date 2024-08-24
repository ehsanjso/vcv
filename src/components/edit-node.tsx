import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const EditNodeSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name cannot be empty.",
  }),
  comment: z.string().trim().optional(),
});

export default function EditNode({
  nodeId,
  nodeName,
  nodeComment,
  setOpen,
}: {
  nodeId: string;
  nodeName: string;
  nodeComment?: string;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const { data, mutate } = api.node.editNode.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof EditNodeSchema>>({
    resolver: zodResolver(EditNodeSchema),
    defaultValues: {
      name: nodeName,
      comment: nodeComment,
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof EditNodeSchema>) => {
      mutate({
        id: nodeId,
        name: values.name,
        comment: values.comment,
      });
      setOpen(false);
    },
    [setOpen, nodeId],
  );
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Node</DialogTitle>
        <DialogDescription>
          Edit the name and comment of the node.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
