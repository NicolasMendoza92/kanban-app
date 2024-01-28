import { authOptions } from "@/lib/authOptions";
import { liveblocksClient } from "@/lib/liveblocksClient";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
    // Get the current user from your database
    const session = await getServerSession(authOptions);

    if (session) {
        const user = session.user;
        const email = user?.email || '';
        // Identify the user and return the result, so we use the component that we've already created "liveblocksClient"
        const { status, body } = await liveblocksClient.identifyUser(
            {
                userId: email,
                groupIds: [],
            },
            { userInfo: {
                name: user?.name || '', 
                email: email, 
                image: user?.image,
            } },
        );

        return new Response(body, { status });
    } else {
        return new Response('Unauthorized', { status: 401 })
    }


}
