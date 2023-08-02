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
import { useNicheModal } from "@/hooks/use-niche-modal";
import { toast } from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1, {message: "Must provide a name for the niche."}),
})

export const NicheModal = () => {
    const nicheModal = useNicheModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            const response = await axios.post('/api/niches', values);

            toast.success("Niche created.")

            window.location.assign(`/niches`);
        } catch(error) {
            toast.error("Something went wrong.")
        }finally {
            setLoading(false);
        }
    }

    return (
        <Modal title="Create niche" description="Create a new niche" isOpen={nicheModal.isOpen} onClose={nicheModal.onClose}>
             <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Field" {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                <Button disabled={loading} type="reset" variant="outline" onClick={nicheModal.onClose}>Cancel</Button>
                                <Button disabled={loading} type="submit">Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}