import css from "./Header.module.css"
import { NavLink, useNavigate } from "react-router-dom";
import Select from "react-select";

export default function Header() {

    const options = [
        { value: "/aboutus", label: "About Novi Agro" },
        { value: "/leadership", label: "Executive Board" },
        { value: "/activity", label: "Our Activity" },
    ];

    const navigate = useNavigate();

    const handleChange = (selectedOption) => {
        navigate(selectedOption.value);
    };

    const selectStyles = {
        control: (provided) => ({
            ...provided,
            border: 'none',
            backgroundColor: 'transparent',
            minHeight: '25px',
            height: '25px',
            boxShadow: 'none',
            cursor: 'pointer',
        }),
        
        indicatorSeparator: () => ({
            display: 'none'
        }),
        
        dropdownIndicator: (provided) => ({
            ...provided,
            color: 'var(--green)',
            padding: '0 4px',
            transition: 'none',
            '&:hover': {
                color: 'var(--green)'
            }
        }),
        
        placeholder: (provided) => ({
            ...provided,
            color: 'var(--green)',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '20px',
            margin: 0
        }),
        
        singleValue: (provided) => ({
            ...provided,
            color: 'var(--green)',
            fontWeight: 500,
            fontSize: '18px',
            lineHeight: '20px',
            margin: 0
        }),
        
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 8px',
            height: '25px'
        }),
        
        menu: (provided) => ({
            ...provided,
            backgroundColor: 'var(--white)',
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            borderRadius: '18px',
        }),
        
        option: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            color: 'var(--green)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '16px',
            padding: '8px 12px',
            '&:hover': {
                backgroundColor: 'transparent'
            }
        })
    };

    return (
        <div className={css.header}>
            <nav className={css.navbar}>
                <div className={css.navLinks}>

                    <Select
                        options={options}
                        onChange={handleChange}
                        value={null}
                        classNamePrefix="select"
                        placeholder="About Us"
                        isSearchable={false}
                        styles={selectStyles}
                    />

                    <NavLink
                        to="/products"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        Products
                    </NavLink>

                    <NavLink to="/">
                        <img src="/logo.png" alt="Novi Agro Logo" className={css.logo} />
                    </NavLink>

                    <NavLink
                        to="/events"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        Events
                    </NavLink>
                    
                    <NavLink
                        to="/contacts"
                        end
                        className={({ isActive }) =>
                            isActive ? `${css.link} ${css.active}` : css.link
                        }
                    >
                        Contacts
                    </NavLink>
                </div>
            </nav>
        </div>

    );
}