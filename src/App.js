import {Canvas, useFrame} from "@react-three/fiber";
import {
    Lightformer,
    OrbitControls,
    Environment,
} from "@react-three/drei";
import {easing} from "maath";
import { useRef } from "react";
import Building from "./components/Building";

export const App = () => {
  
  function Rig() {
    
    useFrame((state, delta) => {
      
      // state.camera.lookAt(0, 0, 0);
    })
  }

  return ( 
    <> 
      <Canvas
        eventSource={document.getElementById("root")}
        eventPrefix="client"
        shadows
        camera={{
        position: [
            0, 2, 5
        ],
        fov: 50,
        }}>
        <color attach="background" args={["#010101"]}/>
        <spotLight position={[20, 20, 10]} penumbra={1} castShadow angle={0.2}/>
        <Building/>
        <Environment>
            <Lightformer
                intensity={10}
                position={[10, 15, 0]}
                scale={[10, 50, 1]}
                onUpdate={(self) => self.lookAt(0, 0, 0)}/>
        </Environment>
        <Rig/>
        <OrbitControls/>
      </Canvas> 
    </>
  );
}
