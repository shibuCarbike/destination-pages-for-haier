import styles from "./index.module.scss";
import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { replaceImageUrl } from "utlis/constant";
export default function NewsBox({ item, path, isSponser }) {
  return (
    <Link href={`/${path || "news"}/${item.slug}`} prefetch={false} passHref>
      <div className={styles.warpper}>
        <div className={styles.image_box}>
          <Image
            src={replaceImageUrl(
              item.image && item.image
                ? `${item.image}`
                : "https://api.carbike360.com/uploads/6840fc27ec3d405bbee7d4cc8f92421e.png"
            )}
            alt="image"
            fill={true}
            quality={100}
            // placeholder="blur"
            // blurDataURL="https://via.placeholder.com/180x120"
          />
        </div>

        <div className={styles.details_box}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.desc}>{item.smallDesc}</p>
          {isSponser ? (
            <></>
          ) : (
            <p className={styles.timing}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="bi bi-calendar2-check"
                viewBox="0 0 16 16"
              >
                <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z" />
                <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
              </svg>

              {item.createdDate}
            </p>
          )}
          {isSponser ? (
            <></>
          ) : (
            <Button size="sm" variant="outline-primary">
              Read Full Article
            </Button>
          )}
        </div>
      </div>
    </Link>
  );
}
