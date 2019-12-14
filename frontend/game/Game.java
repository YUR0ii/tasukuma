package game;

import javax.swing.*;
import java.awt.*;
import java.util.ArrayList;
import java.util.Timer;
import java.util.TimerTask;

public class Game extends JFrame
{
    ArrayList<Bear> localBears;
    DrawPanel p;
    Timer t;

    Game()
    {
        p = new DrawPanel();
        add(p);
        this.setSize(400,400);
        this.setVisible(true);
        this.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);

        t = new Timer();
        t.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run()
            {
                Update();
            }
        }, 0, 17);
    }

    class DrawPanel extends JPanel
    {
        DrawPanel()
        {

        }

        @Override
        public void paintComponent(Graphics g)
        {
            super.paintComponent(g);
            Graphics2D g2 = (Graphics2D) g;
            g2.setColor(Color.RED);
            g2.fillRect(0,20,20,40);

        }
    }

    public static void main(String[] args)
    {
        new Game();
    }

    void Update()
    {
        p.repaint();
    }
}