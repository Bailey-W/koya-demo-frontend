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
import { useJobModal } from "@/hooks/use-job-modal";

const formSchema = z.object({
    niche: z.string().min(1, {message: "Must provide 5 channel links."}),
    channel1: z.string().min(1, {message: "Must provide 5 channel links."}),
    channel2: z.string().min(1, {message: "Must provide 5 channel links."}),
    channel3: z.string().min(1, {message: "Must provide 5 channel links."}),
    channel4: z.string().min(1, {message: "Must provide 5 channel links."}),
    channel5: z.string().min(1, {message: "Must provide 5 channel links."}),
})

export const JobModal = () => {
    const jobModal = useJobModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            niche: "",
            channel1: "",
            channel2: "",
            channel3: "",
            channel4: "",
            channel5: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/jobs', values);

            toast.success("Job queued.")

            window.location.assign(`/jobs`);
        } catch(error) {
            toast.error("Something went wrong.")
        }finally {
            setLoading(false);
        }
    }

    return (
        <Modal title="Create job" description="Provide links to 5 channels to find similar creators." isOpen={jobModal.isOpen} onClose={jobModal.onClose}>
             <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="niche" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Niche</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Name" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="channel1" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel 1</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Link" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="channel2" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel 2</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Link" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="channel3" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel 3</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Link" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="channel4" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel 4</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Link" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="channel5" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Channel 5</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Link" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={loading} type="reset" variant="outline" onClick={jobModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}