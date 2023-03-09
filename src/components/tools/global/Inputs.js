import React from "react"
import styled from "styled-components"

const inputProps = (props) => {
    return ({
        className: props.inputClassName,
        type: props.type,
        id: props.id,
        name: props.name,
        placeholder: props.placeholder,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
        onInput: props.onInput,
        onClick: props.onClick,
        onBlur: props.onBlur,
        onFocus: props.onFocus,
        onKeyUp: props.onKeyUp,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        readOnly: props.readOnly,
        disabled: props.disabled,
        min: props.min,
        max: props.max
    })
}

export const DynamicInput = (props) => {
    const { className, text, startIcon, endIcon, endIconClick } = props
    return (
        <Input className={`${className ? 'dynamic-input ' + className : 'dynamic-input'}`}>
            <input
                {...inputProps(props)}
            />
            <label>{text}</label>
            {startIcon &&
                <div className="start_icon">
                    {startIcon}
                </div>
            }
            {endIcon &&
                <dbutton aria-label="end-icon" className="end-icon" onClick={endIconClick}>
                    {endIcon}
                </dbutton>
            }
        </Input>
    )
}

const Input = styled.div`
    position    : relative;
    display     : flex;
    align-items : center;
    width       : 100%;

    &::before {
        content         : '';
        position        : absolute;
        top             : 0;
        right           : 0;
        bottom          : 0;
        left            : 0;
        background      : rgba(var(--primary-rgb), 0.08);
        backdrop-filter : blur(10px);
        z-index         : -1;
    }

     input {
        display       : block;
        height        : 48px;
        padding       : 18px 10px 2px;
        flex-grow     : 1;
        color         : var(--input-text);
        font-family   : var(--font-fam2);
        outline       : none;
        background    : transparent;
        z-index       : 1;
        border        : none;
        border-bottom : 2px solid var(--light-border);

        &::placeholder {
            opacity : 0;
        }

        &:placeholder-shown {
            + label {
                font-size  : 14px;
                transform  : translateY(-42%);
                color      : var(--placeholder);
                transition : .2s ease;
            }
        }

        &:focus {
            border-bottom : 2px solid var(--primary);
            box-shadow    : none;

            + label {
                position   : absolute;
                left       : 10px;
                top        : 50%;
                color      : var(--primary);
                transform  : translateY(-125%);
                font-size  : 11px;
                z-index    : 0;
                transition : .2s ease;
            }
        }
    }
    
    label {
        position    : absolute;
        left        : 10px;
        top         : 50%;
        color       : var(--placeholder);
        font-family : var(--font-fam2);
        transform   : translateY(-125%);
        font-size   : 11px;
        z-index     : 0;
        transition  : .2s ease;
    }

    .end-icon {
        position  : absolute;
        right     : 20px;
        top       : 55%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            color  : var(--placeholder);
            height : 20px;
            width  : 20px;
        }
    }

    &.success {
        background : rgba(var(--success-rgb), 0.1);
        input {
            background    : rgba(var(--success-rgb), 0.1);
            border-bottom : 2px solid var(--success);
            + label {
                color : var(--success);
            }
        }

        .end-icon {
            display : none;
        }
    }
    &.err {
        background : rgba(var(--danger-rgb), 0.1);
        input {
            background    : rgba(var(--danger-rgb), 0.1);
            border-bottom : 2px solid var(--danger);
            + label {
                color : var(--danger);
            }
        }

        .end-icon {
            display : none;
        }
    }
`;

/**
 * 
 */

export const Textarea = (props) => {
    const { text, className } = props
    return (
        <TextareaInput className={`${className ? "textarea " + className : "textarea"}`}>
            <textarea
                className="custom-scrollbar"
                {...inputProps(props)}
            />
            <label>{text}</label>
        </TextareaInput>
    )
}

const TextareaInput = styled.div`
    position    : relative;
    display     : flex;
    align-items : center;
    flex-grow   : 1;

    &::before {
        content         : '';
        position        : absolute;
        top             : 0;
        right           : 0;
        bottom          : 0;
        left            : 0;
        background      : rgba(var(--primary-rgb), 0.08);
        backdrop-filter : blur(10px);
        z-index         : -1;
    }

    textarea {
        display       : block;
        min-height    : 48px;
        height        : 48px;
        max-height    : 300px;
        max-width     : 100%;
        padding       : 20px 10px 2px;
        flex-grow     : 1;
        color         : var(--input-text);
        outline       : none;
        background    : transparent;
        z-index       : 1;
        border        : none;
        border-bottom : 2px solid var(--light-border);
        resize        : vertical;
        font-family   : var(--font-fam2);

        &::placeholder {
            opacity : 0;
        }

        &:placeholder-shown {
            + label {
                font-size        : 14px;
                top              : 15px;
                color            : var(--placeholder);
                background-color : none;
                width            : unset;
                transition       : .2s ease;
            }
        }

        &:focus {
            border-bottom : 2px solid var(--primary);
            box-shadow    : none;

            + label {
                position   : absolute;
                left       : 10px;
                top        : 5px;
                color      : var(--primary);
                font-size  : 11px;
                transition : .2s ease;
            }
        }

        &::-webkit-resizer {
            border-color: var(--body);
        }
    }

    &::after {
        content        : "↓";
        font-size      : 18px;
        position       : absolute;
        height         : 22px;
        width          : 20px;
        text-align     : center;
        bottom         : 5px;
        right          : -1px;
        color          : var(--primary);
    }
    
    label {
        position    : absolute;
        left        : 10px;
        top         : 0;
        padding     : 0 0 3px;
        color       : var(--placeholder);
        font-family : var(--font-fam2);
        width       : calc(100% - 25px);
        font-size   : 11px;
        z-index     : 1;
        transition  : .2s ease;
    }

    .end-icon {
        position  : absolute;
        right     : 20px;
        top       : 55%;
        transform : translateY(-50%);
        z-index   : 2;
        cursor    : pointer;

        svg {
            color  : var(--placeholder);
            height : 20px;
            width  : 20px;
        }
    }

    &.succes {
        background : rgba(var(--green-rgb), 0.1) !important;
        textarea {
            border-bottom : 2px solid var(--green);
            + label {
                color : var(--green);
            }
        }

        .end-icon {
            display : none;
        }
    }
    &.err {
        background : rgba(var(--red-rgb), 0.2);
        textarea {
            border-bottom : 2px solid var(--red);
            + label {
                color : var(--red);
            }
        }

        .end-icon {
            display : none;
        }
    }
`;