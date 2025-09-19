'use client';

import { useState } from 'react';
import { members } from '@/lib/data';
import type { Member } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MembersPage() {
  const [sortedMembers, setSortedMembers] = useState<Member[]>([...members]);
  const [sortOrder, setSortOrder] = useState('name-asc');

  const sortMembers = (value: string) => {
    setSortOrder(value);
    const sorted = [...members].sort((a, b) => {
      if (value === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      if (value === 'name-desc') {
        return b.name.localeCompare(a.name);
      }
      // Add more sorting options if needed
      return 0;
    });
    setSortedMembers(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-headline">Members Directory</h1>
        <div className="w-48">
          <Select value={sortOrder} onValueChange={sortMembers}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMembers.map((member, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell>{member.dob || 'Not Set'}</TableCell>
                <TableCell>{member.phone || 'Not Set'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
