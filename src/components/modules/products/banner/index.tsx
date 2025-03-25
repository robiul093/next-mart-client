import style from './banner.module.css'

export default function ProductBanner({ title, path }: { title: string, path: string }) {
    return (
        <div className={`${style.banner} border-2 border-white rounded-2xl flex justify-center items-center`}>
            <div className='text-center'>
                <h2 className='text-3xl font-bold text-[#0F0E0E]'>{title}</h2>
                <p className='font-medium text-[#0F0E0EB2] leading-8'>{path}</p>
            </div>
        </div>
    )
}
