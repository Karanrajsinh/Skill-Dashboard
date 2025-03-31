"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ScoreData } from "@/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (data: ScoreData) => void;
  initialData: ScoreData;
}

export default function UpdateScoresModal({
  open,
  onOpenChange,
  onUpdate,
  initialData,
}: Props) {
  const [formData, setFormData] = useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] w-[95%] mx-auto">
        <DialogHeader>
          <DialogTitle>Update Scores</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="rank">Update your Rank</Label>
            <Input
              id="rank"
              type="number"
              value={formData.rank}
              onChange={(e) =>
                setFormData({ ...formData, rank: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="percentile">Update your Percentile</Label>
            <Input
              id="percentile"
              type="number"
              value={formData.percentile}
              onChange={(e) =>
                setFormData({ ...formData, percentile: parseInt(e.target.value) })
              }
            />
          </div>
          <div>
            <Label htmlFor="score">Update your Current Score (out of 15)</Label>
            <Input
              id="score"
              type="number"
              value={formData.score}
              onChange={(e) =>
                setFormData({ ...formData, score: parseInt(e.target.value) })
              }
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}