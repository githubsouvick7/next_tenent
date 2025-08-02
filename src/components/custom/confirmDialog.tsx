import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type DialogType = "delete" | "edit" | "cancel";

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  onConfirm: () => void;
  type?: DialogType;
  title?: string;
  description?: string;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  type = "delete",
  title,
  description,
}) => {
  const dialogConfigs: Record<
    DialogType,
    {
      defaultTitle: string;
      defaultDescription: string;
      confirmText: string;
      confirmVariant: "default" | "destructive";
    }
  > = {
    delete: {
      defaultTitle: "Are you sure you want to delete?",
      defaultDescription:
        "This action cannot be undone. This will permanently remove the data.",
      confirmText: "Delete",
      confirmVariant: "destructive",
    },
    edit: {
      defaultTitle: "Save Changes?",
      defaultDescription: "Do you want to save the changes you made?",
      confirmText: "Save",
      confirmVariant: "default",
    },
    cancel: {
      defaultTitle: "Discard Changes?",
      defaultDescription:
        "You have unsaved changes. Are you sure you want to discard them?",
      confirmText: "Discard",
      confirmVariant: "destructive",
    },
  };

  const config = {
    ...dialogConfigs[type],
    title: title || dialogConfigs[type].defaultTitle,
    description: description || dialogConfigs[type].defaultDescription,
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{config.title}</DialogTitle>
          <DialogDescription>{config.description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onConfirm();
              // if (type === "delete") {
              //   toast.success("Deleted successfully");
              // } else if (type === "edit") {
              //   toast.success("Saved successfully");
              // } else if (type === "cancel") {
              //   toast.success("Discarded changes");
              // }
              onClose(false);
            }}
            variant={config.confirmVariant}
          >
            {config.confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
