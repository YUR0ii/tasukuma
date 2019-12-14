package game;

import javax.swing.*;

public abstract class Bear extends JComponent
{
    ImageIcon display;
    String name;
    String blurb;

    public abstract void animate();
}
