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

const AddNodeSchema = z.object({
  name: z.string().trim().min(1, {
    message: "Name cannot be empty.",
  }),
  comment: z.string().trim().optional(),
});

export default function AddNode({
  nodeId,
  nodeName,
  setOpen,
}: {
  nodeId: string | null;
  nodeName: string | null;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const { data, mutate } = api.node.addNode.useMutation({
    onSuccess() {
      router.refresh();
    },
  });
  const form = useForm<z.infer<typeof AddNodeSchema>>({
    resolver: zodResolver(AddNodeSchema),
    defaultValues: {
      name: "",
      comment: undefined,
    },
  });

  const onSubmit = useCallback(
    (values: z.infer<typeof AddNodeSchema>) => {
      mutate({
        name: values.name,
        prev: nodeId,
        comment: values.comment,
      });

      setOpen(false);
    },
    [nodeId, setOpen],
  );
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add a Node</DialogTitle>
        <DialogDescription className="flex flex-col">
          <span className="font-mono">{`previous node id: ${nodeId}`}</span>
          <span className="font-mono">{`previous node name: ${nodeName}`}</span>
        </DialogDescription>
      </DialogHeader>
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
    </DialogContent>
  );
}
