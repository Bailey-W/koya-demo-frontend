"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Modal } from "@/components/ui/modal";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { useParams } from "next/navigation";
import { useAddChannelModal } from "@/hooks/use-add-channel-modal";

const formSchema = z.object({
    link: z.string().min(1, {message: "Must provide a link for the channel."}),
})

export const AddChannelModal = () => {
    const addChannelModal = useAddChannelModal();

    const params = useParams();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link:"",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const newValues = {
                link: values.link,
                nicheId: params.nicheId
            }
            const response = await axios.post(`/api/niches/channels`, newValues);

            toast.success("Channel added.")

            window.location.assign(`/niches/${params.nicheId}`);
        } catch(error) {
            toast.error("Something went wrong.")
        }finally {
            setLoading(false);
        }
    }

    return (
        <Modal title="Add Channel" description="Add a new channel to the niche." isOpen={addChannelModal.isOpen} onClose={addChannelModal.onClose}>
             <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="link" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Link</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Channel link" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={loading} type="reset" variant="outline" onClick={addChannelModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}