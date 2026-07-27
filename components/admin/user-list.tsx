"use client";

import { updateUserRole } from "@/lib/actions/admin";
import { ROLES, type RoleKey } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, User } from "lucide-react";

interface User {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
  created_at: string;
}

interface UserListProps {
  users: User[];
}

function RoleBadge({ role }: { role: string }) {
  return (
    <Badge variant={ROLES[role as RoleKey]?.color ?? "default"}>
      {ROLES[role as RoleKey]?.label ?? role}
    </Badge>
  );
}

function RoleForm({ user }: { user: User }) {
  return (
    <form action={updateUserRole} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={user.id} />
      <Select name="role" defaultValue={user.role}>
        <SelectTrigger className="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(ROLES).map(([key, { label }]) => (
            <SelectItem key={key} value={key}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" size="sm">
        Speichern
      </Button>
    </form>
  );
}

export function UserList({ users }: UserListProps) {
  return (
    <>
      {/* Desktop: Tabelle */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>E-Mail</TableHead>
              <TableHead>Rolle</TableHead>
              <TableHead>Registriert</TableHead>
              <TableHead>Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">
                  {u.full_name ?? "—"}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <RoleBadge role={u.role} />
                </TableCell>
                <TableCell>
                  {new Date(u.created_at).toLocaleDateString("de-DE")}
                </TableCell>
                <TableCell>
                  <RoleForm user={u} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <Card key={u.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-3">
                <CardTitle className="text-base leading-tight">
                  {u.full_name ?? "—"}
                </CardTitle>
                <RoleBadge role={u.role} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3 pt-0">
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="break-all">{u.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 shrink-0" />
                <span>
                  Registriert am{" "}
                  {new Date(u.created_at).toLocaleDateString("de-DE")}
                </span>
              </div>
              <div className="pt-2 border-t">
                <RoleForm user={u} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
