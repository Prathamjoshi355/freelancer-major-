import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ResetPasswordForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Create a new password to secure your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" action="#">
          <div className="grid gap-2">
            <Label htmlFor="password">New password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm">Confirm password</Label>
            <Input id="confirm" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Update password
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
