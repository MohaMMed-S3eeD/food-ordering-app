import AdminTabs from "./_components/AdminTabs";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdminTabs />
      {children}
    </>
  );
}

export default AdminLayout;
