import { cookies } from "next/headers";
import { isAdmin } from "../services/api";
import { redirect } from "next/navigation";
import Select from "../components/Admin/Select";

export default async function Admin() {
  const cookie = (await cookies()).get("session")?.value;

  if (cookie) {
    const check = await isAdmin(cookie);
    if (check.status === 200) {
      return (
        <div className="w-full flex items-center justify-center h-screen">
          <Select />
          {/* Так как мне надо управлять состоянием, я создал отдельный компонент */}
        </div>
      );
    }
  }
  return redirect("/");
}
