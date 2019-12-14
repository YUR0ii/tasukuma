package bears;

import game.*;

import java.awt.*;
import javax.imageio.ImageIO;
import javax.swing.*;
import java.awt.image.BufferedImage;
import java.io.File;

public class Chuu extends Bear
{
    BufferedImage[] images;

    void getImages()
    {
        try
        {
            images = new BufferedImage[]
                    {
                            ImageIO.read(new File("kuma.png"))
                    };
        }catch(Exception e){};
    }

    public void animate()
    {

    }
}
