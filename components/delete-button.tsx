"use client";

import { Button } from "./ui/button"
import { Eye, Trash } from "lucide-react"
import { ConfirmModal } from "./modals/confirm-modal";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface DeleteButtonProps {
    id: string,
    route: string
};

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id, route }: DeleteButtonProps)  => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
      try {
        setLoading(true);
        await axios.delete(`${route}/${id}`);
        router.refresh();
        toast.success("Deleted.");
        setOpen(false);
      }catch (error) {
        toast.error("Something went wrong.");
      }finally {
        setLoading(false);
      }
  }

  return(
      <>
        <ConfirmModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
        <Button className="ml-2" variant="destructive" onClick={() => setOpen(true)} size="icon">
            <Trash />
        </Button>
      </>
      
  )
}