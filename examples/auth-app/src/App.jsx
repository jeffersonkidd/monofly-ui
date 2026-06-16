// A sign-in screen assembled entirely from monofly exports — no local
// components, no bespoke styling.
//
// `AuthTemplate` is the centered-card page shell (logo / form / footer slots).
// It does NOT wire context itself, so we wrap it in `<AllProviders>` to get the
// theme tokens (dark class) and the data providers the primitives expect.
import {
  AllProviders,
  AuthTemplate,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Label,
  Input,
  Button,
  ModeToggle,
} from "monofly";

export default function App() {
  return (
    <AllProviders>
      <AuthTemplate
        logo={
          <span className="text-lg font-semibold tracking-tight">monofly</span>
        }
        footer={<>By continuing you agree to the Terms & Privacy Policy.</>}
      >
        <Card>
          <CardHeader>
            <CardTitle>Welcome back</CardTitle>
            <CardDescription>
              Sign in to your workspace to continue.
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </CardContent>

          <CardFooter className="flex items-center justify-between gap-3">
            <Button className="flex-1">Sign in</Button>
            <ModeToggle />
          </CardFooter>
        </Card>
      </AuthTemplate>
    </AllProviders>
  );
}
