import Button from '@mui/material/Button';

interface ButtonProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    type?: 'submit' | 'button' | 'reset';
    variant?: 'contained' | 'outlined' | 'text';
    size?: 'small' | 'medium' | 'large';
    onClick?: () => Promise<void>;
}

function ButtonComp(props: ButtonProps) {
    const {
        style,
        className,
        disabled = false,
        fullWidth = false,
        type = 'button',
        variant = 'text',
        size = 'medium',
        onClick,
        ...passProps
    } = props;

    return (
        <>
            <Button
                style={style}
                className={className}
                disabled={disabled}
                fullWidth={fullWidth}
                type={type}
                variant={variant}
                size={size}
                onClick={onClick}
                {...passProps}
            >
                {props.children}
            </Button>
        </>
    );
}

export default ButtonComp;
