// этот комп будет отвечать за отображения одной картинки
import '../styles/DogsCard.css'

function DogsCard ({url}) {
    return (
        <li className='dog-card'>
            <img src={url} alt='random dog' loading='lazy'></img>
        </li>
    );
}

export default DogsCard;    