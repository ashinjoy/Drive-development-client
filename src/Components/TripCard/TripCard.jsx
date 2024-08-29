import React from 'react';

const TripCard = ({ title, date, time, price, status }) => {
  return (
    <div className="flex items-center bg-white p-4 rounded-lg border-2 border-black shadow-md mb-4">
      <div className="flex-shrink-0">
        <img
          src="/assets/TukTuk_Green_v1.png"
          alt="Car Icon"
          className="w-24 h-20"
        />
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">
          {date} • {time}
        </p>
        <p className="text-sm text-gray-600">
          ₹{price} • {status}
        </p>
      </div>
      <div className="flex space-x-2">
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Help</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Details</button>
        <button className="px-4 py-2 bg-gray-200 rounded-lg text-sm">Rebook</button>
      </div>
    </div>
  );
};

export default TripCard;
