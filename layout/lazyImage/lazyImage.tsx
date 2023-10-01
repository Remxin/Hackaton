import styles from "./style.module.css"
import Image from 'next/image'

function LazyImage({ uuid, width, height }: { uuid: string, height: number, width: number }) {



    return (
        <>
            <div className="blur-load" style={{ backgroundImage: `/assets/smalluniversities/${uuid}.png` }}>
                <Image
                    src={`/assets/universities/${uuid}.png`}
                    width={600}
                    height={1000}
                    alt="yes"
                    loading="lazy"
                />
            </div>
        </>
    )
}

export default LazyImage    