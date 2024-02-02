
import { useOthers, useSelf } from "@/app/liveblocks.config";
import styles from "./Avatars.module.css";
import Image from "next/image";

export function Avatars() {
    const users = useOthers();
    const currentUser = useSelf();

    return (
        <div className={styles.avatars}>
            {users.map(({ connectionId, info }) => {
                return (
                    <Avatar key={connectionId} image={info.image} name={info.name} />
                );
            })}

            {currentUser && (
                <div className="relative ml-8 first:ml-0">
                    <Avatar
                        image={currentUser.info.image}
                        name={currentUser.info.name}
                    />
                </div>
            )}
        </div>
    );
}

export function Avatar({ image, name }: { image: string; name: string }) {
    return (
        <div className={styles.avatar} data-tooltip={name}>
            <Image
                width={20}
                height={20}
                alt="avatar"
                src={image}
                className={styles.avatar_picture}
                data-tooltip={name} />
        </div>
    );
}