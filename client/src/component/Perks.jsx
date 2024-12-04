import React from 'react';

function Perks({ selected, onChange }) {
    const handleCbClick = (e) => {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
        } else {
            onChange(selected.filter(selectedName => selectedName !== name));
        }
    };

    return (
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <label htmlFor="wifi" className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input id="wifi" checked={selected.includes('wifi')} type="checkbox" name="wifi" onChange={handleCbClick} />
                <i className="fa-solid fa-wifi"></i>
                <span>Wi-Fi</span>
            </label>
            <label htmlFor="parking" className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input id="parking" checked={selected.includes('parking')} type="checkbox" name="parking" onChange={handleCbClick} />
                <i className="fa-solid fa-car-side"></i>
                <span>Free parking spot</span>
            </label>
            <label htmlFor="tv" className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input id="tv"  checked={selected.includes('tv')} type="checkbox" name="tv" onChange={handleCbClick} />
                <i className="fa-solid fa-tv"></i>
                <span>TV</span>
            </label>
            <label htmlFor="radio" className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input id="radio" checked={selected.includes('radio')} type="checkbox" name="radio" onChange={handleCbClick} />
                <i className="fa-solid fa-radio"></i>
                <span>Radio</span>
            </label>
            <label htmlFor="pets" className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input id="pets" checked={selected.includes('pets')} type="checkbox" name="pets" onChange={handleCbClick} />
                <i className="fa-solid fa-paw"></i>
                <span>Pets</span>
            </label>
            <label htmlFor="entrance" className="border p-3 flex rounded-2xl gap-2 items-center cursor-pointer">
                <input id="entrance" checked={selected.includes('entrance')} type="checkbox" name="entrance" onChange={handleCbClick} />
                <i className="fa-solid fa-shield-halved"></i>
                <span>Private entrance</span>
            </label>
        </div>
    );
}

export default Perks;
