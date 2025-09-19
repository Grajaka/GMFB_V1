import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import '../styles/globals.css';

export default function PaginationRounded() {
    return (
        <div className="pagination">
            <Stack spacing={2}>
                <Pagination count={10} shape="rounded" />
                {/*<Pagination count={10} variant="outlined" shape="rounded" />*/}
            </Stack>

        </div>

    );
}