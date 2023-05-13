import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';

export const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '60%',
    [theme.breakpoints.up('md')]: {
        marginLeft: theme.spacing(2),
        width: '60%',
    },
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '50ch',
        // Below width determines size of text box entries
        // using %s doesn't seem to have desired effect.
        [theme.breakpoints.up('md')]: {
            width: '50ch'
        },
    },
}));

export interface SearchBarProps {
  searchCallback: ((event: any) => void);
}

export default function SearchBar(props: SearchBarProps) {
      return (
        <Container
        maxWidth="md"
        disableGutters
        sx={{ flexGrow: 1 }}
        >
            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="What are we in the mood for?"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={props.searchCallback}
                />
            </Search>
        </Container>
    );
}