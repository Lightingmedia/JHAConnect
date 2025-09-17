'use client';

import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Upload } from 'lucide-react';

interface MemberUploadProps {
  onUpload: (file: File) => void;
  onCancel: () => void;
}

export function MemberUpload({ onUpload, onCancel }: MemberUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.name.endsWith('.xls')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Invalid file type. Please upload an XLS or XLSX file.');
        setFile(null);
      }
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    } else {
      setError('Please select a file to upload.');
    }
  };

  return (
    <Dialog open onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">Upload Member Data</DialogTitle>
          <DialogDescription>
            Select an XLS or XLSX file to bulk-update the community member list. The existing list will be replaced.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <Label htmlFor="file-upload">XLS File</Label>
            <Input 
                id="file-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".xls,.xlsx"
                className="cursor-pointer"
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
             {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
        </div>
        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" /> Upload and Replace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
