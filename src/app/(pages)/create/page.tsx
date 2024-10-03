import Section from "@/components/ui/section";
import UnauthorizedPage from "@/components/unauthorized";
import CreatePostForm from "@/features/posts/components/create-post";
import { Protect } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Page() {
    const { userId } = auth();
    if (!userId) redirect("/sign-up");

    return (
        <Section>
            <Protect
                fallback={<UnauthorizedPage />}
                permission="org:listing:create"
            >
                <CreatePostForm />
            </Protect>
        </Section>
    );
}
