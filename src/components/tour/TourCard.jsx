import { Car, Clock, Eye, MapPinned, MoveRight, NotepadText, Plane } from 'lucide-react'
import './tour.css'
import Button from '../ui/Button'
import { formatEstimatedTime } from '../../services/utils'

export default function TourCard({
    id,
    title,
    description,
    imageSrc,
    views,
    location,
    isHover,
    price = 0,
    segment = 'SAVE MONEY',
    vehicle = 'car',
    time = '1D1N',
    locate
}) {
    return (<>

        <div className='tour-card'>
            <div className='tour-segment-label'>{segment}</div>
            <img className='tour-card-image' src={imageSrc} />
            <div className='tour-card-content'>
                <div className='tour-header'>
                    <div className='tour-header-content' style={{ display: "flex", gap: "10px", alignItems: 'center' }}>
                        <div>{vehicle == 'plane' ? <Plane /> : <Car />}</div>|
                        <div><Clock size={20} />{formatEstimatedTime(time)}</div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", justifyContent: "center", alignItems:"center" }}><Eye strokeWidth={1} />{views}</div>
                </div>
                <div className='tour-content'>
                    <div style={{ display: 'flex', gap: "10px", alignItems: 'center' }}>
                        <div style={{ fontSize: 23 }}>{price.toLocaleString('de-DE')}đ</div>
                    </div>
                    <div className='tour-title'>{title}</div>

                    <div className='tour-description' dangerouslySetInnerHTML={{ __html: description }} />
                </div>
                <div className='tour-footer'>
                    <div>{location}</div>
                    <div><a href={`/tour/${id}`}><Button iconRight={<NotepadText color='rgba(80, 125, 162, 1)' />} value={'Show detail'} /></a></div>

                </div>
            </div>
        </div>
    </>)
}
