import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: "200px", background: "#ddd", padding: "10px" }}>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <br />
          <a href="/dashboard/settings">Ustawienia</a>
        </nav>
      </aside>
      <section style={{ flex: 1, padding: "10px" }}>{children}</section>
    </div>
  );
}
