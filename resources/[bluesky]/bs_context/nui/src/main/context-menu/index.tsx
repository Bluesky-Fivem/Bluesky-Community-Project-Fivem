import { Button, Slide, Typography, useTheme } from "@mui/material";
import { HandleNuiEvent } from "handlers/HandleNuiEvents";
import { HandleNuiMessage } from "handlers/HandleNuiMessage";
import React from "react";
import { styles } from "./styles";
import { ContextMenuTooltip } from "./Tooltip";


export function ContextMenu(props: any) {
    const theme = useTheme();
    const [SHOW, SET_SHOW] = React.useState(false);
    const [CONTEXT_MENU_DATA, SET_CONTEXT_MENU_DATA]: any = React.useState({
        title: 'Burger Shot',
        data: [
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            },
            {
                title: 'Cheese',
                icon: 'utensils',
                text: 'This burger is made from the hands of god. (dairy, dairy, vegetables, dairy, vegetables)',
                description: '1 Bun, 1 Cheese, 1 Lettuce, 1 Patty | 10s',
                arrow: true
            }
        ]
    });

    HandleNuiMessage("bs-context:setData", (data: any) => {
        SET_CONTEXT_MENU_DATA(data)
    })

    HandleNuiMessage("bs-context:open", (open) => {
        SET_SHOW(open)
    })

    const KeyDownEvent = (e) => {
        e.key.includes('Escape') && HandleNuiEvent<any>("bs-context:close", {});
    }

    return (
        React.useEffect(() => {
            if (SHOW) {
                window.addEventListener('keydown', KeyDownEvent),
                () => {
                    window.removeEventListener('keydown', KeyDownEvent)
                }
            }
        }, [SHOW]),
        <Slide
            in={SHOW}
            timeout={300}
            mountOnEnter
            unmountOnExit
        >
            <div
                className={styles.main}
            >
                <div
                    className={styles.container}
                >
                    <div
                        className={styles.title}
                    >
                        {CONTEXT_MENU_DATA.title}
                    </div>
                    <div
                        className={styles.content}
                    >
                        {CONTEXT_MENU_DATA.data.map((item: any, index: number) => {
                            return (
                                <ContextMenuTooltip
                                    placement="left"
                                    title=" "
                                    sx={{
                                        '& .MuiTooltip-tooltip': {
                                            background: 'transparent',
                                            backgroundImage: `url(${ item.image })`,
                                            backgroundSize: 'cover',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center'
                                        }
                                    }}
                                >
                                    <Button 
                                        disabled={item.disabled}
                                        variant="contained"
                                        className={styles.item}
                                        sx={{
                                            background: theme.palette.grey[900],
                                            border: `0.185vh solid ${ theme.palette.grey[800] }`,
                                            '&.Mui-disabled': {
                                                background: theme.palette.grey[900],
                                                border: `0.185vh solid ${ theme.palette.grey[800] }`,
                                                opacity: 0.7
                                            }
                                        }}
                                        onClick={() => {
                                            HandleNuiEvent<any>("bs-context:pressButton", item)
                                        }}
                                    >
                                        <div
                                            className={styles.itemContent}
                                        >
                                            <div
                                                className={styles.itemTitle}
                                            >
                                                {item.icon && (
                                                    <i 
                                                        className={`${styles.icon} ${item.icon}`}
                                                    />
                                                )}
                                                {item.title}
                                            </div>
                                            <div
                                                className={styles.itemText}
                                            >
                                                <Typography
                                                    className={styles.description}
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    {item.description}
                                                </Typography>
                                                {item.text && (
                                                    <Typography
                                                        className={styles.text}
                                                        variant="body2"
                                                        color="textSecondary"
                                                    >
                                                        {item.text}
                                                    </Typography>
                                                )}
                                            </div>
                                        </div>
                                        {item.arrow && (
                                            <path 
                                                className={styles.arrow}
                                                d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
                                            />
                                        )}
                                    </Button>
                                </ContextMenuTooltip>
                            )
                        })}
                    </div>
                </div>

            </div>
        </Slide>
    )
}