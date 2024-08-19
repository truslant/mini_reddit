import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it, vi } from "vitest";
import { store } from "../store";
import ChannelMenuItem from "./ChannelMenuItem";
import userEvent from "@testing-library/user-event";

describe('ChannelMenuItem', ()=>{
    
    it('renders the component', ()=>{
        render(
            <Provider store={store}>
                <ChannelMenuItem channel='Mock Channel'/>
            </Provider>
        )
        const menuItem = screen.getByTestId('channel');
        expect(menuItem).toBeInTheDocument();
        expect(menuItem).toHaveTextContent('Mock Channel');
    });

    it('triggers channel change', async ()=>{
        vi.spyOn(store, 'dispatch')
        const user = userEvent.setup();
        render(
            <Provider store={store}>
                <ChannelMenuItem channel='Mock Channel' />
            </Provider>
        )
        const changeChannelButton = screen.getByTestId('changeChannelButton');
        await user.click(changeChannelButton);
        expect(store.dispatch).toBeCalledWith({
            type: 'channel/changeChannel',
            payload: 'Mock Channel'
        })
    });
})