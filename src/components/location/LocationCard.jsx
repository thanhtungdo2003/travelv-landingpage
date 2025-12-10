import { Eye, MapIcon, MapPin, MapPinned } from 'lucide-react'
import './style.css'
import Button from '../ui/Button'
import { formatNumber } from '../../services/utils'

export default function LocationCard({
    id,
    title,
    description,
    imageSrc,
    views,
    tourAmount,
    isHover,
}) {
    return (<>
        <a href={`/travelv-landingpage/location/${id}`}>
            <div className='location-card'>
                <img className='location-card-image' src={imageSrc} />
                <div className='location-card-content'>
                    <div className='location-header'>
                        <div>Destination</div>
                        <div className='views-box'><Eye />{formatNumber(views)}</div>
                    </div>
                    <div className='location-content'>
                        <div className='location-title'>{title}</div>
                        <div className='location-description' dangerouslySetInnerHTML={{ __html: description }}></div>
                    </div>
                    <div className='location-footer'>
                        <div>{formatNumber(tourAmount)} Tour</div>
                        <div><Button iconRight={<MapPinned color='rgba(138, 138, 138, 1)' />} value={'Show map'} /></div>
                    </div>
                </div>
            </div>
        </a>
    </>)
}
