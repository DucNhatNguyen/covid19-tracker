import React from 'react';
//import PropTypes from 'prop-types';
import { FormControl,InputLabel, NativeSelect, FormHelperText } from '@material-ui/core';

function CountrySelector({value, handleOnChange, countries}) {
    return (
        <FormControl>
            <InputLabel htmlFor='country-selector' shrink>
            Nations
            </InputLabel>

            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: 'country',
                    id: 'country-selector',
                }}
            >
                {countries.map((country) => {
                    return (
                        <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                            {country.Country}
                        </option>
                    );
                })}
            </NativeSelect>
            <FormHelperText>Lua chon</FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;