import { redirect } from "next/navigation";

export default function RootPage() {
  // This page should not be reached when middleware is working correctly
  // The middleware will handle the redirect to /vi (default locale)
  redirect("/vi");
}
