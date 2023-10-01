import styles from "./style.module.css"
import Image from 'next/image'

type componentProps = {
    uuid: string
    divClass?: string
    imageClass?: string,
    width: number
    height: number
}

function LazyImage({ uuid, width, height, divClass = "" }: componentProps) {



    return (

        <div className={`blur-load ${divClass}`} style={{ backgroundImage: `/assets/smalluniversities/${uuid}.png` }}>
            <Image
                src={`/assets/universities/${uuid}.png`}
                alt="yes"
                loading="lazy"
                className="h-full w-full select-none rounded-md object-fill"
                draggable={false}
                width={width}
                height={height}
            />
        </div>

    )
}

export default LazyImage    