import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import NavMenu from "./NavMenu";
import { Provider } from "react-redux";
import { store } from '../store/index'
import userEvent from "@testing-library/user-event";

describe('NavMenu', () => {
    it('renders the Component', () => {
        render(
            <Provider store={store} >
                <NavMenu />
            </Provider>
        );
        const navmenu = screen.getByTestId('navmenu');
        expect(navmenu).toBeInTheDocument();
    });

    it('triggers store state update', async () => {
        vi.spyOn(store, 'dispatch');
        const user = userEvent.setup();
        render(
            <Provider store={store}>
                <NavMenu />
            </Provider>
        )
        const searchInput = screen.getByTestId('searchInput');
        await user.type(searchInput, 'google.com');
        expect(store.dispatch).toBeCalledWith({
            type: 'searchQuote/changeSearchQuote',
            payload: 'google.com'
        });
    })
});