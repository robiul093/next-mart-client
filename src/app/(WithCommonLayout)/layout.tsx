import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/NavBar";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
        </>
    )
}
