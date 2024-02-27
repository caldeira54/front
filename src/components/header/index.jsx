import './header.css';

import sys from '../../assets/img/sys.png';

export default function Header() {
    return (
        <header className='container-header'>
            <img src={sys} />
            <span>sysPPT</span>
        </header>
    )
}