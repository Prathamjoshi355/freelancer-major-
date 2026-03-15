import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SubmitProposalPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-balance">Submit Proposal</h2>
        <p className="text-muted-foreground">Craft a compelling proposal for the job.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Proposal Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="jobRef">Job reference</Label>
              <Input id="jobRef" name="jobRef" placeholder="Paste job URL or ID" />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="rate">Proposed rate (USD)</Label>
              <Input id="rate" name="rate" type="number" placeholder="e.g. 1200" />
            </div>

            <div className="grid gap-1">
              <Label htmlFor="timeline">Delivery timeline</Label>
              <Select>
                <SelectTrigger id="timeline" aria-label="Delivery timeline">
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2w">1–2 weeks</SelectItem>
                  <SelectItem value="2-4w">2–4 weeks</SelectItem>
                  <SelectItem value="1-2m">1–2 months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1">
              <Label htmlFor="cover">Cover letter</Label>
              <Textarea id="cover" name="cover" placeholder="Explain how you’ll approach this project..." rows={6} />
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button type="reset" variant="outline">
                Reset
              </Button>
              <Button type="submit">Send Proposal</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
