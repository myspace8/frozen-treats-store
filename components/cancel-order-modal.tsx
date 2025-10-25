"use client"

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, X } from "lucide-react"

interface CancelOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
  isLoading: boolean
  orderId?: string
}

export function CancelOrderModal({ open, onOpenChange, onConfirm, isLoading, orderId }: CancelOrderModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Cancel Order #{orderId?.replace("order-", "") || "N/A"}?
          </DialogTitle>
          <DialogDescription>
            This action cannot be undone. You'll lose any prep time, but you can reorder anytime.
            <br />
            <span className="text-xs text-muted-foreground mt-1 block">
              Only available for pending orders.
            </span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Keep Order
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <X className="h-4 w-4 animate-spin" />
                Cancelling...
              </>
            ) : (
              <>
                <X className="h-4 w-4" />
                Cancel Order
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}