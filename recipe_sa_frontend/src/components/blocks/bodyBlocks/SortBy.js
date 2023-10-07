import React from 'react'

function SortBy(props) {
 


    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        props.handleChange(selectedValue);
    };

    const dropdownOptions = props.sortOptions.map(
        (option) => (
            <option
                key={option.id}
                value={option.id}
            >{option.name}</option>
        )
    )
  return (
    <div>
          <select
              value={(props.sortOptions.filter((option) => (option.id === props.selectedSortOption))).name}
            //   className="form-select form-select-sm"
            //   aria-label=".form-select-sm example"
              onChange={handleSelectChange}
          >
        {dropdownOptions}
        </select>
    </div>
  )
}

export default SortBy;

